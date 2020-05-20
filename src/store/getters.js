const getters = {
    user: state => state.user.user,
    addRoutes: state => state.permission.addRoutes,
    routes: state => state.permission.routes,
    roles: state => state.permission.roles,
}

export default getters
