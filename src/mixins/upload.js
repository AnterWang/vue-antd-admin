export default {
    methods: {
        validateImg(file, maxSize, exts = ['.jpg', '.png']) {
            if (
                file.size > maxSize
            ) {
                let mSize = maxSize / 1024 / 1024;
                if (mSize > 1) {
                    const overSize = (maxSize / 1024 / 1024).toFixed(2)
                    this.$message.error(`文件大小超过${overSize}M`)
                    return false
                } else {
                    const overSize = (maxSize / 1024).toFixed(2)
                    this.$message.error(`文件大小超过${overSize}M`)
                    return false
                }
            }

            let ext = file.name.slice(file.name.lastIndexOf('.'));

            if (exts.indexOf(ext) == -1) {
                this.$message.error('仅支持jpg和png的图片');
                return false;
            }

            return true
        },

        validateImgWidthAndHeight(file, size, reject, callback) {
            if (!FileReader || !size) return callback();
            var reader = new FileReader();
            reader.onload = (e) => {
                var data = e.target.result;
                var image = new Image();
                image.onload = () => {
                    var width = image.width;
                    var height = image.height;
                    if (size.width != width || size.height != height) {
                        this.$message.error(`图片大小要求 ${size.width}*${size.height}`)
                        reject()
                        return;
                    }
                    callback()
                };
                image.src = data;
            };
            reader.readAsDataURL(file);
        },
    }
}