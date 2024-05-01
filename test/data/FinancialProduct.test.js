import { FinancialProduct } from "../../data/models/FinancialProductModel";

describe("FinancialProduct", () => {
    it("should create an instance with correct values", () => {
        const dateRelease = new Date();
        const dateRevision = new Date();

        const product = new FinancialProduct({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            logo: "logo1.png",
            date_release: dateRelease,
            date_revision: dateRevision,
        });

        expect(product.id).toBe("1");
        expect(product.name).toBe("Product 1");
        expect(product.description).toBe("Description 1");
        expect(product.logo).toBe("logo1.png");
        expect(product.date_release).toEqual(dateRelease);
        expect(product.date_revision).toEqual(dateRevision);
    });

    it("should create an instance from JSON", () => {
        const dateReleaseString = "2023-01-01";
        const dateRevisionString = "2024-01-01";

        const json = {
            id: "2",
            name: "Product 2",
            description: "Description 2",
            logo: "logo2.png",
            date_release: dateReleaseString,
            date_revision: dateRevisionString,
        };

        const productFromJson = FinancialProduct.fromJson(json);

        expect(productFromJson.id).toBe("2");
        expect(productFromJson.name).toBe("Product 2");
        expect(productFromJson.description).toBe("Description 2");
        expect(productFromJson.logo).toBe("logo2.png");
        expect(productFromJson.date_release).toEqual(new Date(dateReleaseString));
        expect(productFromJson.date_revision).toEqual(new Date(dateRevisionString));
    });
});

