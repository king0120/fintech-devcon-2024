import {db} from "@/db/index";
import {companies, Company, Transaction, transactions} from "@/db/schema";
const testCompanies: Company[] = [
    {id: 1, name: 'Tech Titans', address: '123 Silicon Valley', accountNumber: '3938475628', routingNumber: '30598303', balance: 1000000, maskedAccountNumber: '7890', accountName: 'Tech Titans', type: 'checking'},
    {id: 2, name: 'Code Crafters', address: '456 Innovation Ave', accountNumber: '1234567890', routingNumber: '98765432', balance: 200, maskedAccountNumber: '1234', accountName: 'Code Crafters', type: 'checking'},
    {id: 3, name: 'Digital Dynamics', address: '789 Cybernetics Ct', accountNumber: '9876543210', routingNumber: '12345678', balance: 454324, maskedAccountNumber: '5678', accountName: 'Digital Dynamics', type: 'savings'},
    {id: 4, name: 'Binary Builders', address: '101 Algorithm Alley', accountNumber: '5678901234', routingNumber: '87654321', balance: 353432, maskedAccountNumber: '2345', accountName: 'Binary Builders', type: 'brokerage'},
    {id: 5, name: 'Pixel Pioneers', address: '1024 Resolution Rd', accountNumber: '4567890123', routingNumber: '76543210', balance: 494883, maskedAccountNumber: '6789', accountName: 'Pixel Pioneers', type: 'checking'},
    {id: 6, name: 'Data Driven', address: '256 Database Dr', accountNumber: '3456789012', routingNumber: '65432109', balance: 6000000, maskedAccountNumber: '3456', accountName: 'Data Driven', type: 'savings'},
    {id: 7, name: 'Quantum Quest', address: '128 Qubit Quay', accountNumber: '2345678901', routingNumber: '54321098', balance: 7000000, maskedAccountNumber: '0123', accountName: 'Quantum Quest', type: 'brokerage'},
    {id: 8, name: 'Machine Minds', address: '64 AI Ave', accountNumber: '1234567890', routingNumber: '43210987', balance: 8000000, maskedAccountNumber: '4567', accountName: 'Machine Minds', type: 'checking'},
    {id: 9, name: 'Neural Networks', address: '32 Synapse St', accountNumber: '2345678901', routingNumber: '32109876', balance: 9000000, maskedAccountNumber: '8901', accountName: 'Neural Networks', type: 'savings'},
    {id: 10, name: 'Deep Divers', address: '16 Deep Learning Dr', accountNumber: '3456789012', routingNumber: '21098765', balance: 10000000, maskedAccountNumber: '2345', accountName: 'Deep Divers', type: 'brokerage'},
    {id: 11, name: 'Cloud Climbers', address: '8 Overcast Oval', accountNumber: '4567890123', routingNumber: '10987654', balance: 11000000, maskedAccountNumber: '6789', accountName: 'Cloud Climbers', type: 'checking'},
    {id: 12, name: 'Fintech Frontiers', address: '4 Ledger Ln', accountNumber: '5678901234', routingNumber: '09876543', balance: 12000000, maskedAccountNumber: '0123', accountName: 'Fintech Frontiers', type: 'savings'},
    {id: 13, name: 'Blockchain Brigade', address: '2 Bit Blvd', accountNumber: '6789012345', routingNumber: '98765432', balance: 13000000, maskedAccountNumber: '4567', accountName: 'Blockchain Brigade', type: 'brokerage'},
    {id: 14, name: 'Crypto Crusaders', address: '1 Coin Ct', accountNumber: '7890123456', routingNumber: '87654321', balance: 14000000, maskedAccountNumber: '8901', accountName: 'Crypto Crusaders', type: 'checking'},
    {id: 15, name: 'VR Ventures', address: '512 Virtual Vista', accountNumber: '8901234567', routingNumber: '76543210', balance: 15000000, maskedAccountNumber: '2345', accountName: 'VR Ventures', type: 'savings'},
    {id: 16, name: 'AR Architects', address: '256 Augmented Alley', accountNumber: '9012345678', routingNumber: '65432109', balance: 16000000, maskedAccountNumber: '6789', accountName: 'AR Architects', type: 'brokerage'},
    {id: 17, name: 'IoT Innovators', address: '128 Internet St', accountNumber: '0123456789', routingNumber: '54321098', balance: 17000000, maskedAccountNumber: '0123', accountName: 'IoT Innovators', type: 'checking'},
    {id: 18, name: 'Mobile Mavens', address: '64 Mobile Manor', accountNumber: '1234567890', routingNumber: '43210987', balance: 18000000, maskedAccountNumber: '4567', accountName: 'Mobile Mavens', type: 'savings'},
    {id: 19, name: 'Web Wizards', address: '32 WWW Way', accountNumber: '2345678901', routingNumber: '32109876', balance: 19000000, maskedAccountNumber: '8901', accountName: 'Web Wizards', type: 'brokerage'},
    {id: 20, name: 'Software Sorcerers', address: '16 Script St', accountNumber: '3456789012', routingNumber: '21098765', balance: 20000000, maskedAccountNumber: '2345', accountName: 'Software Sorcerers', type: 'checking'},
];
const testTransactions: Transaction[] = [
    {id: 1, payerId: 1, payeeId: 2, amount: 1000, status: 'pending', dateCompleted: '2021-01-01T12:34:56', dateInitiated: '2021-01-01T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 2, payerId: 2, payeeId: 3, amount: 2000, status: 'complete', dateCompleted: '2021-01-02T12:34:56', dateInitiated: '2021-01-02T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 3, payerId: 3, payeeId: 4, amount: 3000, status: 'pending', dateCompleted: '2021-01-03T12:34:56', dateInitiated: '2021-01-03T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 4, payerId: 4, payeeId: 5, amount: 4000, status: 'pending', dateCompleted: '2021-01-04T12:34:56', dateInitiated: '2021-01-04T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 5, payerId: 5, payeeId: 6, amount: 5000, status: 'void', dateCompleted: '2021-01-05T12:34:56', dateInitiated: '2021-01-05T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 6, payerId: 6, payeeId: 7, amount: 6000, status: 'complete', dateCompleted: '2021-01-06T12:34:56', dateInitiated: '2021-01-06T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 7, payerId: 7, payeeId: 8, amount: 7000, status: 'pending', dateCompleted: '2021-01-07T12:34:56', dateInitiated: '2021-01-07T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 8, payerId: 8, payeeId: 9, amount: 8000, status: 'pending', dateCompleted: '2021-01-08T12:34:56', dateInitiated: '2021-01-08T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 9, payerId: 9, payeeId: 10, amount: 9000, status: 'void', dateCompleted: '2021-01-09T12:34:56', dateInitiated: '2021-01-09T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 10, payerId: 10, payeeId: 11, amount: 10000, status: 'complete', dateCompleted: '2021-01-10T12:34:56', dateInitiated: '2021-01-10T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 11, payerId: 11, payeeId: 12, amount: 11000, status: 'pending', dateCompleted: '2021-01-11T12:34:56', dateInitiated: '2021-01-11T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 12, payerId: 12, payeeId: 13, amount: 12000, status: 'pending', dateCompleted: '2021-01-12T12:34:56', dateInitiated: '2021-01-12T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 13, payerId: 13, payeeId: 14, amount: 13000, status: 'complete', dateCompleted: '2021-01-13T12:34:56', dateInitiated: '2021-01-13T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 14, payerId: 14, payeeId: 15, amount: 14000, status: 'pending', dateCompleted: '2021-01-14T12:34:56', dateInitiated: '2021-01-14T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 15, payerId: 15, payeeId: 16, amount: 15000, status: 'void', dateCompleted: '2021-01-15T12:34:56', dateInitiated: '2021-01-15T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 16, payerId: 16, payeeId: 17, amount: 16000, status: 'pending', dateCompleted: '2021-01-16T12:34:56', dateInitiated: '2021-01-16T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 17, payerId: 17, payeeId: 18, amount: 17000, status: 'complete', dateCompleted: '2021-01-17T12:34:56', dateInitiated: '2021-01-17T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 18, payerId: 18, payeeId: 19, amount: 18000, status: 'pending', dateCompleted: '2021-01-18T12:34:56', dateInitiated: '2021-01-18T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 19, payerId: 19, payeeId: 20, amount: 19000, status: 'pending', dateCompleted: '2021-01-19T12:34:56', dateInitiated: '2021-01-19T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 20, payerId: 20, payeeId: 1, amount: 20000, status: 'pending', dateCompleted: '2021-01-20T12:34:56', dateInitiated: '2021-01-20T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 21, payerId: 1, payeeId: 3, amount: 30000, status: 'pending', dateCompleted: '2021-01-21T12:34:56', dateInitiated: '2021-01-21T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 22, payerId: 3, payeeId: 5, amount: 50000, status: 'complete', dateCompleted: '2021-01-22T12:34:56', dateInitiated: '2021-01-22T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 23, payerId: 5, payeeId: 7, amount: 70000, status: 'pending', dateCompleted: '2021-01-23T12:34:56', dateInitiated: '2021-01-23T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 24, payerId: 7, payeeId: 9, amount: 90000, status: 'pending', dateCompleted: '2021-01-24T12:34:56', dateInitiated: '2021-01-24T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 25, payerId: 9, payeeId: 11, amount: 110000, status: 'void', dateCompleted: '2021-01-25T12:34:56', dateInitiated: '2021-01-25T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 26, payerId: 11, payeeId: 13, amount: 130000, status: 'pending', dateCompleted: '2021-01-26T12:34:56', dateInitiated: '2021-01-26T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 27, payerId: 13, payeeId: 15, amount: 150000, status: 'complete', dateCompleted: '2021-01-27T12:34:56', dateInitiated: '2021-01-27T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 28, payerId: 15, payeeId: 17, amount: 170000, status: 'pending', dateCompleted: '2021-01-28T12:34:56', dateInitiated: '2021-01-28T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 29, payerId: 17, payeeId: 19, amount: 190000, status: 'pending', dateCompleted: '2021-01-29T12:34:56', dateInitiated: '2021-01-29T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 30, payerId: 19, payeeId: 1, amount: 210000, status: 'pending', dateCompleted: '2021-01-30T12:34:56', dateInitiated: '2021-01-30T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 31, payerId: 1, payeeId: 4, amount: 410000, status: 'complete', dateCompleted: '2021-01-31T12:34:56', dateInitiated: '2021-01-31T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 32, payerId: 4, payeeId: 7, amount: 710000, status: 'pending', dateCompleted: '2021-02-01T12:34:56', dateInitiated: '2021-02-01T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 33, payerId: 7, payeeId: 10, amount: 1010000, status: 'pending', dateCompleted: '2021-02-02T12:34:56', dateInitiated: '2021-02-02T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 34, payerId: 10, payeeId: 13, amount: 1310000, status: 'pending', dateCompleted: '2021-02-03T12:34:56', dateInitiated: '2021-02-03T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 35, payerId: 13, payeeId: 16, amount: 1610000, status: 'pending', dateCompleted: '2021-02-04T12:34:56', dateInitiated: '2021-02-04T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 36, payerId: 16, payeeId: 19, amount: 1910000, status: 'pending', dateCompleted: '2021-02-05T12:34:56', dateInitiated: '2021-02-05T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 37, payerId: 19, payeeId: 2, amount: 2200000, status: 'pending', dateCompleted: '2021-02-06T12:34:56', dateInitiated: '2021-02-06T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 38, payerId: 2, payeeId: 5, amount: 5200000, status: 'pending', dateCompleted: '2021-02-07T12:34:56', dateInitiated: '2021-02-07T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 39, payerId: 5, payeeId: 8, amount: 8200000, status: 'pending', dateCompleted: '2021-02-08T12:34:56', dateInitiated: '2021-02-08T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 40, payerId: 8, payeeId: 11, amount: 11200000, status: 'pending', dateCompleted: '2021-02-09T12:34:56', dateInitiated: '2021-02-09T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 41, payerId: 11, payeeId: 14, amount: 14200000, status: 'pending', dateCompleted: '2021-02-10T12:34:56', dateInitiated: '2021-02-10T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 42, payerId: 14, payeeId: 17, amount: 17200000, status: 'pending', dateCompleted: '2021-02-11T12:34:56', dateInitiated: '2021-02-11T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 43, payerId: 17, payeeId: 20, amount: 20200000, status: 'pending', dateCompleted: '2021-02-12T12:34:56', dateInitiated: '2021-02-12T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 44, payerId: 20, payeeId: 3, amount: 23000000, status: 'pending', dateCompleted: '2021-02-13T12:34:56', dateInitiated: '2021-02-13T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 45, payerId: 3, payeeId: 6, amount: 63000000, status: 'pending', dateCompleted: '2021-02-14T12:34:56', dateInitiated: '2021-02-14T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 46, payerId: 6, payeeId: 9, amount: 103000000, status: 'complete', dateCompleted: '2021-02-15T12:34:56', dateInitiated: '2021-02-15T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 47, payerId: 9, payeeId: 12, amount: 133000000, status: 'pending', dateCompleted: '2021-02-16T12:34:56', dateInitiated: '2021-02-16T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 48, payerId: 12, payeeId: 15, amount: 163000000, status: 'pending', dateCompleted: '2021-02-17T12:34:56', dateInitiated: '2021-02-17T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 49, payerId: 15, payeeId: 18, amount: 193000000, status: 'pending', dateCompleted: '2021-02-18T12:34:56', dateInitiated: '2021-02-18T12:34:56', description: 'Test transaction', facilitatorFee: 0},
    {id: 50, payerId: 18, payeeId: 1, amount: 213000000, status: 'pending', dateCompleted: '2021-02-19T12:34:56', dateInitiated: '2021-02-19T12:34:56', description: 'Test transaction', facilitatorFee: 0},
];
const seed = async () => {
    await db.delete(transactions)
    await db.delete(companies)
    await db.insert(companies).values(testCompanies);
    await db.insert(transactions).values(testTransactions);
    console.log('Seeded companies and transactions');
}
seed();