import dayjs from "dayjs";

const transactionTypes = ["dr", "cr"];
const paymentMethods = ["cash", "upi", "card", "bank"];
const titles = [
  "Grocery",
  "Fuel",
  "Shopping",
  "Salary",
  "Rent",
  "Electricity Bill",
  "Internet Bill",
  "Food",
  "Travel",
];

const randomFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomAmount = (type) => {
  if (type === "cr") {
    return String(Math.floor(Math.random() * 20000) + 10000); // income
  }
  return String(Math.floor(Math.random() * 2000) + 200); // expense
};

export const generateFakeTransactions = (days = 30) => {
  const transactions = [];

  for (let i = 0; i < days; i++) {
    const transactionsPerDay = Math.floor(Math.random() * 3) + 1; // 1–3 txns/day

    for (let j = 0; j < transactionsPerDay; j++) {
      const date = dayjs()
        .subtract(i, "day")
        .hour(Math.floor(Math.random() * 23))
        .minute(Math.floor(Math.random() * 59))
        .second(0);

      const type = randomFromArray(transactionTypes);

      transactions.push({
        _id: { $oid: `fake_id_${i}_${j}` },
        transactionType: type,
        userId: "6861002da91e80d9fe536a0b",
        title: randomFromArray(titles),
        amount: randomAmount(type),
        paymentMethod: randomFromArray(paymentMethods),
        key: date.toISOString(),
        date: { $date: date.toISOString() },
        note: "Fake transaction data",
        createdAt: { $date: date.toISOString() },
        updatedAt: { $date: date.toISOString() },
        __v: 0,
      });
    }
  }

  return transactions;
};
