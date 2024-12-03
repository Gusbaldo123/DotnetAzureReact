import ApiManager from "./ApiManager";

class VideoManager{
    //#region Handlers
    constructor()
    {
        if(VideoManager.instance)
            return VideoManager.instance;

        VideoManager.instance = this;
    }
    //#region TODO
    addVideo(video) {
        return ApiManager.addVideo(video);
    }
    deleteVideo(courseId, videoId) {
        return ApiManager.deleteVideo(courseId, videoId);
    }
    //#endregion
    //#endregion
}

//#region exports
const videoManager = new VideoManager();
export default videoManager;
//#endregion
