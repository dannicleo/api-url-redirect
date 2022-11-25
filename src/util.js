const getUrlToRedirect = function( options ){
    if ( !options.endPoints.length || options.endPointName == '' ) {
        return options.urlDefault
    } else {
        const endPointList = options.endPoints.filter( endPoint => endPoint.name === options.endPointName )
        if ( endPointList[0] ) {
            return !options.redirectUrl? endPointList[0].defaultUrl: endPointList[0].redirectUrl
        } else {
            return options.urlDefault
        }
    }
}

module.exports = { getUrlToRedirect }