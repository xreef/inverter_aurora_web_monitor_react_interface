let loadImage = function(src, callback){
    var img = new Image();
    img.onload = function(){
        if (callback) callback(img);
    }
    img.src = src;
    return img;
}
export default loadImage;