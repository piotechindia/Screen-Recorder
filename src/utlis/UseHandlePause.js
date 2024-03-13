export const UseHandlePause = (mixstream, videoref) => {
    try {
        mixstream.pause();
        videoref.current.pause();
    } catch (error) {
        console.log(error);
    }
}