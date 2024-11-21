class VideoManager{
    //#region Handlers
    constructor()
    {
        if(VideoManager.instance)
            return VideoManager.instance;

        VideoManager.instance = this;
    }
    //#region TODO
    addVideo(courseId) {
        //TODO
    }
    deleteVideo(courseId, videoId) {
        //TODO
    }
    //#endregion
    //#endregion
}

//#region exports
const videoManager = new VideoManager();
export default videoManager;
//#endregion
