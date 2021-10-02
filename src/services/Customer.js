import http from "../http-common";

class CustomerAPI {
    getAll() {
        return http.get("/customers");
    }

    get(id) {
        return http.get(`/customers/${id}`);
    }

    create(data) {
        return http.post("/customers", data);
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/customers/${id}`);
    }

    deleteAll() {
        return http.delete(`/customers`);
    }

    findByTitle(name) {
        return http.get(`/customers?name=${name}`);
    }
    findByAddress(address) {
        return http.get(`/customers?address=${address}`);
    }
    findByGender(gender) {
        return http.get(`/customers?gender=${gender}`);
    }

    // Upload Image 
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return http.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    // Get Image
    // getImage() {
    //   return http.get("/files");
    // }
}

export default new CustomerAPI();