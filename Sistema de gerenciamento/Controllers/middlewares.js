const authMiddleware = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login'); // Redireciona para a página de login se não estiver autenticado
    }
    next(); // Permite o acesso à rota se o usuário estiver logado
};

export default authMiddleware;
