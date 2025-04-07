using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Controllers
{
    [Route("/api/token")]
    public class MailController : BaseController<Mail>
    {
        private readonly IConfiguration _configuration;

        public MailController(ApplicationContext dbContext, IConfiguration configuration)
            : base(dbContext)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string token)
        {
            Mail mail = new Mail();
            var mailService = new MailService(mail, dbContext, _configuration);
            RestResponse response = await mailService.ConfirmEmail(token);

            if (response.Success)
                return Redirect("http://10.10.10.59:3000/home");
            else
                return Ok(response);
        }
    }

}