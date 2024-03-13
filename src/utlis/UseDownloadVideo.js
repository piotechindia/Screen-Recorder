export const UseDownloadVideo = (blobData) => {
    const aTAg = document.createElement('a');
    aTAg.href = URL.createObjectURL(blobData);
    aTAg.download = URL.createObjectURL(blobData);
    document.body.appendChild(aTAg);
    aTAg.click();
}
