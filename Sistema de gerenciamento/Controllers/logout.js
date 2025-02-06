const logoutController = {
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error("Erro ao destruir a sessão:", err);
                return res.status(500).json({ message: "Erro ao deslogar" });
            }
            res.redirect('/login');
        });
    }
};

export default logoutController;