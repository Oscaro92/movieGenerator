module.exports = function() {
    this.itsOk = function (body, path) {
        if (path === "/list") {
            if(body.vendor_token === "OSCARO92" && (!isEmpty(body.genre) && !isEmpty(body.type))){
                if(genOk(body) && typeOk(body)){
                    return true;
                }else {
                    return false;
                }
            }else{
                return false;
            }
        } else if(path === "/random"){
            if(body.vendor_token === "OSCARO92" && (!isEmpty(body.genre) && !isEmpty(body.type))){
                if(genOk(body) && typeOk(body)){
                    return true;
                }else {
                    return false;
                }
            }else{
                return false;
            }
        }else {
            return true;
        }
    }
    this.isEmpty = function (body) {
        const isEmpty = (value) => (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
        return isEmpty(body)
    }
    this.genOk= function (body) {
        const genres =  ["Adventure", "Family", "Fantasy", "Crime", "Drama", "Comedy", "Animation", "Sci-Fi", "Sport", "Action", "Thriller", "Mystery", "Western", "Romance", "Biography", "Horror", "War", "Musical", "History", "Music", "Documentary", "Short", "Talk-Show", "Game-Show", "Reality-TV", "News", "Adult"]

        if(genres.includes(body.genre)){
            return true;
        } else{
            return false;
        }
    }
    this.typeOk = function (body) {
        const types = ["movie", "series"];

        if(types.includes(body.type)){
            return true;
        } else{
            return false;
        }
    }
}