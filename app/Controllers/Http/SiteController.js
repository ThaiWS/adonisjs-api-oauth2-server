'use strict'

class SiteController {
    async home({view, auth}) {

        const user = auth.user;
        // console.log(user);
        // if (format === 'application/json') {
        //     return user
        // } else {
        //     return view.render('users.view', { user: user.toJSON() })
        // }

        return view.render('site.home', { user: user.toJSON() })
    }
}

module.exports = SiteController
