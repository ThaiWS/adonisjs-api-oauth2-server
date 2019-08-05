'use strict'

class SiteController {
    async home({view}) {

 

        return view.render('site.index')
    }
}

module.exports = SiteController
