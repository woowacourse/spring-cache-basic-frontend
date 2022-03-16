const Store = {
    init() {
        if (localStorage.getItem("countOfCall")) {
            return;
        }
        localStorage.setItem("countOfCall", "0");
    },
    setCountOfCall(countOfCall) {
        localStorage.setItem("countOfCall", countOfCall);
    },
    getCountOfCall() {
        return Number(localStorage.getItem("countOfCall")) || 0;
    },
};

export default Store;
