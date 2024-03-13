export const UseHandleplay = (mixstream, videoref) => {
    try {
        mixstream.resume();
        videoref.current.play();
    } catch (error) {
        console.error(error);
    }
 
}