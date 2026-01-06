const MainApiMock = {
  getCurrentUser() {
    return Promise.resolve({
      name: "Usuario Demo",
      email: "demo@streamwhere.com",
      avatar: "https://i.pravatar.cc/150"
    });
  },

  getWatchlist() {
    const saved = localStorage.getItem("myWatchList");
    return Promise.resolve(saved ? JSON.parse(saved) : []);
  },

  addToWatchlist(item) {
    const saved = JSON.parse(localStorage.getItem("myWatchList")) || [];
    const updated = [...saved, item];
    localStorage.setItem("myWatchList", JSON.stringify(updated));
    return Promise.resolve(item);
  },

  deleteFromWatchlist(id) {
    const saved = JSON.parse(localStorage.getItem("myWatchList")) || [];
    const updated = saved.filter(item => item.externalId !== id);
    localStorage.setItem("myWatchList", JSON.stringify(updated));
    return Promise.resolve();
  },

  updateWatchlistItem(id, status) {
    const saved = JSON.parse(localStorage.getItem("myWatchList")) || [];
    const updated = saved.map(item =>
      item.externalId === id ? { ...item, status } : item
    );
    localStorage.setItem("myWatchList", JSON.stringify(updated));
    return Promise.resolve(
      updated.find(item => item.externalId === id)
    );
  },

  updateUser(data) {
    const user = { ...data };
    localStorage.setItem("user", JSON.stringify(user));
    return Promise.resolve(user);
  }
};

export default MainApiMock;
