import BaseUrl from "./metaData";

export default class BlogService {
  constructor() {
    this.getPost = async (numberPage, token) => {
      const promise = await fetch(
        `${BaseUrl}articles?limit=5&offset=${numberPage}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const resolve = await promise.json();
      const { articles, articlesCount } = resolve;
      return { articles, articlesCount };
    };
    this.getPostWithSlug = async (slug, token) => {
      const promise = await fetch(`${BaseUrl}articles/${slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const resolve = await promise.json();
      const { article } = resolve;
      return { article };
    };
    this.signUpPostRequest = async (data, url) => {
      try {
        const promise = await fetch(`${BaseUrl}${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });
        const resolve = await promise.json();
        return resolve;
      } catch (er) {
        return er;
      }
    };
    this.updateCurrentUser = async (data, token) => {
      try {
        const promise = await fetch(`${BaseUrl}/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(data),
        });
        const resolve = await promise.json();
        return resolve;
      } catch (er) {
        return er;
      }
    };
    this.postNewArticle = async (data, token) => {
      try {
        const promise = await fetch(`${BaseUrl}/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(data),
        });
        const resolve = await promise.json();
        return resolve;
      } catch (er) {
        return er;
      }
    };
    this.updateArticle = async (data, token, slug) => {
      try {
        const promise = await fetch(`${BaseUrl}/articles/${slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(data),
        });
        const resolve = await promise.json();
        return resolve;
      } catch (er) {
        return er;
      }
    };
    this.deleteArticle = async (slug, token) => {
      try {
        const promise = await fetch(`${BaseUrl}/articles/${slug}`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        return promise;
      } catch (er) {
        return er;
      }
    };
    this.estimationPost = async (slug, token, method) => {
      try {
        const promise = await fetch(`${BaseUrl}/articles/${slug}/favorite`, {
          method: `${method}`,
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        return promise;
      } catch (er) {
        return er;
      }
    };
  }
}
