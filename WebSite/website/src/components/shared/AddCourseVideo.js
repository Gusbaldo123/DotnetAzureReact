//#region Imports
import React, { useState } from "react";

import CourseManager from "../../utils/CourseManager";
import VideoManager from "../../utils/VideoManager";

export default AddCourseVideo;
//#endregion

//#region Handlers
async function AddVideo(videoData, videoList, updateVideoList) {
    await VideoManager.add(videoData);
    const newVideoList = [...videoList, videoData];
    updateVideoList(newVideoList);
};
function handleChange(e, updateVideoValues) {
    updateVideoValues(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
};
async function handleAddClick(onAdd, videoValues, showAddVideo, emptyVideoValues, videoList, updateVideoList, setShowAddVideo, updateVideoValues, setWatchedVidList) {
    if (!(videoValues.fkCourseId > 0)) return;
    if (videoValues.videoTitle.length < 1) return;
    if (videoValues.videoUrl.length < 1) return;

    await onAdd(videoValues, videoList, updateVideoList);

    setShowAddVideo(!showAddVideo);
    updateVideoValues({ ...emptyVideoValues });

    const res = await CourseManager.get(videoValues.fkCourseId);
    if (res && res.data) {
        updateVideoList(res.data.videoList);
        const newVidList = { ...res.data };
        newVidList.videoList = newVidList.videoList.map(() => false);
        setWatchedVidList(newVidList);
    }
};
//#endregion

//#region JSX
function AddCourseVideo({ user, courseId, showAddVideo, setShowAddVideo, videoList, updateVideoList, setWatchedVidList }) {
    const emptyVideoValues = {
        id: 0,
        videoTitle: "",
        videoUrl: "",
        fkCourseId: Number(courseId)
    };
    const [videoValues, updateVideoValues] = useState({ ...emptyVideoValues });
    if (!user) return;
    if (user.isStudent) return;

    if (showAddVideo)
        return (
            <div className="courseVideo newVideo" onClick={() => setShowAddVideo(!showAddVideo)}>
                <p><b>Add new video</b></p>
            </div>
        );

    return (
        <div key="videoNew" className="videoGroup new" id="groupNew">
            <div className="courseVideo vid new" id="vid new">
                <div className="videoContent">
                    <div className="txtVideoName">
                        <label>Video Name: </label>
                        <input type="text" name="videoTitle" value={videoValues.videoTitle} onChange={(e)=>{handleChange(e,updateVideoValues)}} />
                    </div>
                    <div>
                        <label>Video URL: </label>
                        <input type="text" name="videoUrl" value={videoValues.videoUrl} onChange={(e)=>{handleChange(e,updateVideoValues)}} />
                    </div>
                    <div>
                        <button onClick={async () => { handleAddClick(AddVideo, videoValues, showAddVideo, emptyVideoValues, videoList, updateVideoList,setShowAddVideo, updateVideoValues, setWatchedVidList) }}>Add</button>
                        <button onClick={() => setShowAddVideo(!showAddVideo)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
//#endregion