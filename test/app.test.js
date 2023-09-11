const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");

chai.use(chaiHttp);

describe("API Routes", () => {
  let personId;

  it("should create a new person", async () => {
    const res = await chai.request(app).post("/api").send({ name: "John Doe" });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("_id");
    personId = res.body._id;
  });

  it("should retrieve a person by ID", async () => {
    const res = await chai.request(app).get(`/api/${personId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("_id", personId);
  });

  it("should update a person by ID", async () => {
    const updatedName = "Updated Name";
    const res = await chai
      .request(app)
      .put(`/api/${personId}`)
      .send({ name: updatedName });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("_id", personId);
    expect(res.body).to.have.property("name", updatedName);
  });

  it("should delete a person by ID", async () => {
    const res = await chai.request(app).delete(`/api/${personId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message", "Person deleted");
  });
});
