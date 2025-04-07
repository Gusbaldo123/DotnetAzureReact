using System.Net;
using System.Net.Mail;
using System.Security.Principal;
using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

public class MailService : ApiService<Mail>
{
    private readonly IConfiguration _configuration;

    public MailService(Mail? _ObjParameter, ApplicationContext _dbContext, IConfiguration configuration)
        : base(_ObjParameter, _dbContext)
    {
        _configuration = configuration;
    }
    async Task<bool?> DbContainsEmail(string email)
    {
        try
        {
            var user = await dbContext.Users.Where(u => u.Email.ToLower() == email.ToLower()).Select(u => new
            {
                id = u.Id,
                email = u.Email
            }).FirstOrDefaultAsync();

            if (user == null) return false;
            else return true;
        }
        catch (System.Exception ex)
        {
            return null;
        }
    }
    bool IsValidEmail(string email)
    {
        var trimmedEmail = email.Trim();

        if (trimmedEmail.EndsWith("."))
        {
            return false;
        }
        try
        {
            var addr = new MailAddress(email);
            return addr.Address == trimmedEmail;
        }
        catch
        {
            return false;
        }
    }
    public async Task<bool> CheckUsableEmail()
    {
        string email = ObjParameter.Email;
        bool? emailFree = !await DbContainsEmail(email);
        bool usableEmail = IsValidEmail(email);

        if (emailFree == true && usableEmail)
            return true;
        else return false;
    }
    public async Task<bool> SendAuthEmail()
    {
        var values = await dbContext.Users
                .Where(u => u.Email == ObjParameter.Email)
                .Select(u => new { u.AuthToken, u.IsAuthenticated })
                .FirstOrDefaultAsync();

        if (values == null)
            return false;
        string token = values.AuthToken;
        bool isAuthenticated = values.IsAuthenticated == true ? true : false;
        if (isAuthenticated)
            return true;

        string confirmUrl = $"http://localhost:5243/api/token?token={token}";
        string body = $"Click to confirm your email: {confirmUrl}";

        // Pegando dados do appsettings
        string host = _configuration["Mail:host"];
        int port = int.Parse(_configuration["Mail:port"]);
        string user = _configuration["Mail:user"];
        string pass = _configuration["Mail:password"];
        bool enableSSL = bool.Parse(_configuration["Mail:enableSSL"]);

        try
        {
            using (var mail = new MailMessage())
            {
                mail.From = new MailAddress(_configuration["Mail:sender"]);
                mail.To.Add(ObjParameter.Email);
                mail.Subject = "Confirm your account";
                mail.Body = body;
                mail.IsBodyHtml = false;

                using (var smtp = new SmtpClient(host, port))
                {
                    smtp.Credentials = new NetworkCredential(user, pass);
                    smtp.EnableSsl = enableSSL;

                    await smtp.SendMailAsync(mail);
                }
            }

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
    public async Task<RestResponse> ConfirmEmail(string token)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.AuthToken == token);
        if (user == null) return GetErrorReponse("Invalid Token");

        user.IsAuthenticated = true;
        user.AuthToken = null;
        await dbContext.SaveChangesAsync();

        return GetDataResponse("Account authenticated successfully.");
    }

}