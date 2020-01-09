const expect = require('chai').expect;
const axios = require('axios');

describe('Testing API endpoints ', () => {

    const basePath = `http://localhost:4000`
    const api = axios.create({baseURL: basePath, timeout: 0});
    const headers = {
        accept: 'json'
    };

    test(`Should return the initial payments list`, async () => {
        const url = `${basePath}/payments`;
        const response = await api.get(url, { headers });

        expect(response.status).toEqual(200);
        expect(_.isArray(response.data)).toBe(true);
        expect(response.data).toHaveLength(10);
    });

    test(`Should return an existinct specific payment`, async () => {
        const url = `${basePath}/payments/4ee3a8d8-ca7b-4290-a52c-dd5b6165ec43`;
        const response = await api.get(url, { headers });

        expect(response.status).toEqual(200);
        expect(typeof response.data).toBe('object');
        expect(response.data.type).toEquals("Payment");
        expect(response.data.id).toEquals("4ee3a8d8-ca7b-4290-a52c-dd5b6165ec43");
        expect(response.data.version).toEquals(0);
        expect(response.data.organisation_id).toEquals("743d5b63-8e6f-432e-a8fa-c5d8d2ee5fcb");
    });

    test(`Should return 404 when requested payment does not exist`, async () => {
        const url = `${basePath}/payments/1234`;
        const response = await api.get(url, { headers });

        expect(response.status).toEqual(404);
    });

    test(`Should create a payment`, async () => {
        let url = `${basePath}/payments`;
        const payload = {
            "type": "Payment",
            "version": 0,
            "organisation_id": "743d5b63-8e6f-432e-a8fa-c5d8d2ee5fcb",
            "attributes": {
              "amount": "100.21",
              "beneficiary_party": {
                "account_name": "W Owens",
                "account_number": "31926819",
                "account_number_code": "BBAN",
                "account_type": 0,
                "address": "1 The Beneficiary Localtown SE2",
                "bank_id": "403000",
                "bank_id_code": "GBDSC",
                "name": "Wilfred Jeremiah Owens"
              },
              "charges_information": {
                "bearer_code": "SHAR",
                "sender_charges": [
                  {
                    "amount": "5.00",
                    "currency": "GBP"
                  },
                  {
                    "amount": "10.00",
                    "currency": "USD"
                  }
                ],
                "receiver_charges_amount": "1.00",
                "receiver_charges_currency": "USD"
              },
              "currency": "GBP",
              "debtor_party": {
                "account_name": "EJ Brown Black",
                "account_number": "GB29XABC10161234567801",
                "account_number_code": "IBAN",
                "address": "10 Debtor Crescent Sourcetown NE1",
                "bank_id": "203301",
                "bank_id_code": "GBDSC",
                "name": "Emelia Jane Brown"
              },
              "end_to_end_reference": "Wil piano Jan",
              "fx": {
                "contract_reference": "FX123",
                "exchange_rate": "2.00000",
                "original_amount": "200.42",
                "original_currency": "USD"
              },
              "numeric_reference": "1002001",
              "payment_id": "123456789012345678",
              "payment_purpose": "Paying for goods/services",
              "payment_scheme": "FPS",
              "payment_type": "Credit",
              "processing_date": "2017-01-18",
              "reference": "Payment for Em's piano lessons",
              "scheme_payment_sub_type": "InternetBanking",
              "scheme_payment_type": "ImmediatePayment",
              "sponsor_party": {
                "account_number": "56781234",
                "bank_id": "123123",
                "bank_id_code": "GBDSC"
              }
            }
          };

        let response = await api.post(url, payload, { headers });

        expect(response.status).toEqual(200);
        expect(typeof response.data).toBe('object');
        expect(response.data.id).not.to.be.null;
        expect(response.data.id).not.to.be.empty;
        
        payload.id = response.data.id;
        expect(response.data).toStrictEqual(payload);

        url = `${basePath}/payments/${payload.id}`;
        response = await api.get(url, { headers });
        expect(response.status).toEqual(200);
        expect(typeof response.data).toBe('object');
        expect(response.data).toStrictEqual(payload);
    });

    test(`Should return bad request when creation payload is invalid`, async () => {
        let url = `${basePath}/payments`;
        const payload = {};

        let response = await api.post(url, payload, { headers });

        expect(response.status).toEqual(400);
    });

    test(`Should update a payment`, async () => {
        let url = `${basePath}/payments/4ee3a8d8-ca7b-4290-a52c-dd5b6165ec43`;
        const payload = {
            "type": "Payment",
            "version": 1,
            "id": "4ee3a8d8-ca7b-4290-a52c-dd5b6165ec43",
            "organisation_id": "743d5b63-8e6f-432e-a8fa-c5d8d2ee5fcb",
            "attributes": {
              "amount": "100.21",
              "beneficiary_party": {
                "account_name": "W Owens",
                "account_number": "31926819",
                "account_number_code": "BBAN",
                "account_type": 0,
                "address": "1 The Beneficiary Localtown SE2",
                "bank_id": "403000",
                "bank_id_code": "GBDSC",
                "name": "Wilfred Jeremiah Owens"
              },
              "charges_information": {
                "bearer_code": "SHAR",
                "sender_charges": [
                  {
                    "amount": "5.00",
                    "currency": "GBP"
                  },
                  {
                    "amount": "10.00",
                    "currency": "USD"
                  }
                ],
                "receiver_charges_amount": "1.00",
                "receiver_charges_currency": "USD"
              },
              "currency": "GBP",
              "debtor_party": {
                "account_name": "EJ Brown Black",
                "account_number": "GB29XABC10161234567801",
                "account_number_code": "IBAN",
                "address": "10 Debtor Crescent Sourcetown NE1",
                "bank_id": "203301",
                "bank_id_code": "GBDSC",
                "name": "Emelia Jane Brown"
              },
              "end_to_end_reference": "Wil piano Jan",
              "fx": {
                "contract_reference": "FX123",
                "exchange_rate": "2.00000",
                "original_amount": "200.42",
                "original_currency": "USD"
              },
              "numeric_reference": "1002001",
              "payment_id": "123456789012345678",
              "payment_purpose": "Paying for goods/services",
              "payment_scheme": "FPS",
              "payment_type": "Credit",
              "processing_date": "2017-01-18",
              "reference": "Payment for Em's piano lessons",
              "scheme_payment_sub_type": "InternetBanking",
              "scheme_payment_type": "ImmediatePayment",
              "sponsor_party": {
                "account_number": "56781234",
                "bank_id": "123123",
                "bank_id_code": "GBDSC"
              }
            }
          };

        let response = await api.put(url, payload, { headers });

        expect(response.status).toEqual(200);
        expect(typeof response.data).toBe('object');
        expect(response.data).toStrictEqual(payload);

        url = `${basePath}/payments/${payload.id}`;
        response = await api.get(url, { headers });
        expect(response.status).toEqual(200);
        expect(typeof response.data).toBe('object');
        expect(response.data).toStrictEqual(payload);
    });

    test(`Should return bad request when update payload is invalid`, async () => {
        let url = `${basePath}/payments/4ee3a8d8-ca7b-4290-a52c-dd5b6165ec43`;
        const payload = {};

        let response = await api.put(url, payload, { headers });

        expect(response.status).toEqual(400);
    });

    test(`Should delete a payment`, async () => {
        let url = `${basePath}/payments/4ee3a8d8-ca7b-4290-a52c-dd5b6165ec43`;
        const payload = {
            "type": "Payment",
            "version": 1,
            "id": "4ee3a8d8-ca7b-4290-a52c-dd5b6165ec43",
            "organisation_id": "743d5b63-8e6f-432e-a8fa-c5d8d2ee5fcb",
            "attributes": {
              "amount": "100.21",
              "beneficiary_party": {
                "account_name": "W Owens",
                "account_number": "31926819",
                "account_number_code": "BBAN",
                "account_type": 0,
                "address": "1 The Beneficiary Localtown SE2",
                "bank_id": "403000",
                "bank_id_code": "GBDSC",
                "name": "Wilfred Jeremiah Owens"
              },
              "charges_information": {
                "bearer_code": "SHAR",
                "sender_charges": [
                  {
                    "amount": "5.00",
                    "currency": "GBP"
                  },
                  {
                    "amount": "10.00",
                    "currency": "USD"
                  }
                ],
                "receiver_charges_amount": "1.00",
                "receiver_charges_currency": "USD"
              },
              "currency": "GBP",
              "debtor_party": {
                "account_name": "EJ Brown Black",
                "account_number": "GB29XABC10161234567801",
                "account_number_code": "IBAN",
                "address": "10 Debtor Crescent Sourcetown NE1",
                "bank_id": "203301",
                "bank_id_code": "GBDSC",
                "name": "Emelia Jane Brown"
              },
              "end_to_end_reference": "Wil piano Jan",
              "fx": {
                "contract_reference": "FX123",
                "exchange_rate": "2.00000",
                "original_amount": "200.42",
                "original_currency": "USD"
              },
              "numeric_reference": "1002001",
              "payment_id": "123456789012345678",
              "payment_purpose": "Paying for goods/services",
              "payment_scheme": "FPS",
              "payment_type": "Credit",
              "processing_date": "2017-01-18",
              "reference": "Payment for Em's piano lessons",
              "scheme_payment_sub_type": "InternetBanking",
              "scheme_payment_type": "ImmediatePayment",
              "sponsor_party": {
                "account_number": "56781234",
                "bank_id": "123123",
                "bank_id_code": "GBDSC"
              }
            }
          };

        let response = await api.delete(url, { headers });

        expect(response.status).toEqual(200);
        
        url = `${basePath}/payments/${payload.id}`;
        response = await api.get(url, { headers });
        expect(response.status).toEqual(404);
    });
});