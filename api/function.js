module.exports = function() {
    this.removeChara = function (variable, that, by, nbRepeat) {
        for (i = 1; i <= nbRepeat; i++) {
            variable = variable.replace(that, by)
        }
        return variable
    }
}