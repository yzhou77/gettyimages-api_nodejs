import Api from "../../gettyimages-api";
import nock from "nock";
import test from "ava";

test.beforeEach(t=>{
    nock("https://api.gettyimages.com")
            .post("/oauth2/token", "client_id=apikey&client_secret=apisecret&grant_type=client_credentials")
            .reply(200, {
                access_token: "client_credentials_access_token",
                token_type: "Bearer",
                expires_in: "1800"
            })
            .post("/v3/downloads/images/123")
            .query({ "auto_download": "false" })
            .reply(200)
            .post("/v3/downloads/images/123")
            .query({ "file_type": "jpg", "auto_download": "false" })
            .reply(200)
            .post("/v3/downloads/images/123")
            .query({ "height": "592", "auto_download": "false"})
            .reply(200)
            .post("/v3/downloads/images/123")
            .query({ "product_id": 5678, "auto_download": "false" })
            .reply(200)
            .post("/v3/downloads/images/123")
            .query({ "product_type": "easyaccess", "auto_download": "false" })
            .reply(200);
});

test.cb("DownloadsImages: When given an id, the id will be part of the path", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.downloadsimages().withId("123").execute((err, response) => {
    }));
});

test.cb("DownloadsImages: When given a file type, the file_type will be part of the query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.downloadsimages().withId("123").withFileType("jpg").execute((err, response) => {
    }));
});

test.cb("DownloadsImages: When given a height, the height will be part of the query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.downloadsimages().withId("123").withHeight("592").execute((err, response) => {
    }));
});

test.cb("DownloadsImages: When given a product id, the product_id will be part of the query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.downloadsimages().withId("123").withProductId(5678).execute((err, response) => {
    }));
});

test.cb("DownloadsImages: When given a product type, the product_type will be part of the query", t => {  
    var client = new Api({ apiKey: "apikey", apiSecret: "apisecret" }, null);
     t.end(client.downloadsimages().withId("123").withProductType("easyaccess").execute((err, response) => {
    }));
});

