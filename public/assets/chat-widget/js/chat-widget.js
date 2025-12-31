function chatWidget() {
    return {
        showButton: false,
        showMenu: false,
        chatOpen: false,

        init() {
            window.addEventListener("scroll", () => {
                this.showButton = window.scrollY > 300;
            });
        },
    };
}
