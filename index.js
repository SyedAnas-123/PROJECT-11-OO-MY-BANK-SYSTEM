//CLASS FOR CUSTOMER , BANK ACCOUNT  INTERFACE ,BANNK ACCCOUNT
//ICUSTOMER SE LEA HAI F_NAME , L_NAME ,GENDER , AGE , AND MOBILE NUMBER
//BANL ACCOUNT : CUSTOMER CAN DEBIT AND CREDIT MONEY
//& CUSTOMER CAN CHECK HIS / HER ACCOUNT BALANCE
//DEBIT : IF ACCOUNT BALANCE IS LESSS THEN DEBIT AMOUNT , TRANSACTION WILLMBE  CANCELLED WIHT A MSG
//CREDIT : 1$ WILL BE DEDUCTED IF MORE THAN $100 IS CREDITED TO THE ACCOUNT
import inquirer from "inquirer";
//BANK ACCOUNT CLASS
class BankAccount {
    //impleements intrface
    accountNumber;
    balance;
    //it is a method jo class ke object ko initialze krta hai
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance; //this object ko refer krta hia or isme clas ke object ko represen tkrta hai.
    }
    //*DEBIT MONEY =USER  JO WITHDRAW KREGA
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`WITHDRAWAL OF ${amount} SUCCESSFUL. REMAINING Balance is : ${this.balance}`);
        }
        else {
            console.log("INSUFFICIENT BALANCE");
        }
    }
    //CREDIT MONEY
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //1 dollar fee charge if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`DEPOSIT OF ${amount} SUCCESSFUL , REMAINING BALANCE IS : ${this.balance}`);
    }
    //CHECK BALANCE
    checkBalance() {
        console.log(`CURRENT BALANCE IS ${this.balance}`);
    }
}
//MAKING CUTOMER CLASS
class Customer {
    F_name;
    L_name;
    Gender;
    age;
    mobileNumber;
    account;
    constructor(F_name, L_name, Gender, age, mobileNumber, account) {
        this.F_name = F_name;
        this.L_name = L_name;
        this.Gender = Gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//MAUNAULLY CREATE USER AND BANK ACCOUNT  & 3 BANK ACCOUNTS
const accounts = [
    new BankAccount(1001, 500), //objctc created with new from bank account class
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//CREATE CUSTOMERS
const customers = [
    new Customer("John", "khan", "MALE", 12, 3162223334, accounts[0]),
    new Customer("SYED", "ANAS", "MALE", 12, 3162266334, accounts[1]),
    new Customer("SYEDA", "khan", "FEMALE", 12, 3162278934, accounts[2]),
];
//FUCNTIONNTO INTERACT WITH BANK ACCOUNT
async function service() {
    do {
        //account number btaega user agr hoga toh
        const accountNumberinput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "ENTER YOUR ACCOUNT NUMBER",
            },
        ]);
        // account me jo user ne input diya hai wo jakr check kro  is nnam ka koi acount number he ya nh
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberinput.accountNumber);
        if (customer) {
            console.log(`WELCOME , ${customer.F_name} ${customer.L_name} \n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select AN OPERATION",
                    choices: ["DEPOSIT", "WITHDRAW", "CHECK-BALANCE", "EXIT"],
                },
            ]);
            //AWITCH CASE
            switch (ans.select) {
                case "DEPOSIT":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "ENTER THE AMOUNT TO DEPOSIT",
                        },
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "WITHDRAW":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "ENTER THE AMOUNT TO WITHDRAW",
                        },
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "CHECK-BALANCE":
                    customer.account.checkBalance();
                    break;
                case "EXIT":
                    console.log("EXITING BANK PROGRAM");
                    console.log("\n THANK YOU FOR VISITING OUR BANK SERVICES , HAVE A GREAT DAY !");
                    return;
            }
        }
        else {
            console.log("INVALID ACCOUNT NUMBER , PLEASE TRY AGAIN");
        }
    } while (true);
}
service();
