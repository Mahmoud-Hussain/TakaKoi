export const DEFAULT_FINANCE_DATA = {
    safeToSpend: 840.50,
    totalBalance: 12450.00,
    netWorthHistory: [
        { month: 'Jan', net: 33000 }, { month: 'Feb', net: 35500 }, { month: 'Mar', net: 35500 },
        { month: 'Apr', net: 38500 }, { month: 'May', net: 42000 },
    ],
    transactions: [
        { id: 1, name: "Apple Music", category: "Subscription", amount: 10.99, date: "2026-05-15", type: "expense", icon: "🎵" },
        { id: 2, name: "Whole Foods", category: "Groceries", amount: 142.30, date: "2026-05-14", type: "expense", icon: "🥑" },
        { id: 3, name: "TechCorp Salary", category: "Income", amount: 3250.00, date: "2026-05-12", type: "income", icon: "💼" },
    ],
    connectedAccounts: [
        { id: 1, name: "Chase Checking", balance: 4500, type: "Bank", icon: "🏦" },
        { id: 2, name: "Vanguard 401k", balance: 32000, type: "Investment", icon: "📈" }
    ],
    budgets: [
        { id: 1, category: "Dining Out", spent: 150, limit: 300, icon: "🍔" },
        { id: 2, category: "Groceries", spent: 400, limit: 500, icon: "🛒" },
        { id: 3, category: "Transportation", spent: 80, limit: 150, icon: "🚗" },
    ],
    subscriptions: [
        { id: 1, name: "Netflix", cost: 15.49, status: "Active", icon: "🍿" },
        { id: 2, name: "Gym Membership", cost: 45.00, status: "Active", icon: "🏋️" },
        { id: 3, name: "Adobe Creative Cloud", cost: 54.99, status: "Flagged", icon: "🎨" }
    ],
    debts: [
        { id: 1, name: "Student Loan", balance: 12000, apr: 4.5, minPayment: 150, icon: "🎓" },
        { id: 2, name: "Chase Sapphire", balance: 1450, apr: 22.4, minPayment: 45, icon: "💳" }
    ],
    goals: [
        { id: 1, name: "Emergency Fund", saved: 5000, target: 10000, icon: "🛡️" },
        { id: 2, name: "Japan Trip", saved: 1200, target: 4000, icon: "✈️" }
    ],
    assetAllocation: [
        { name: 'US Stocks', value: 45000, color: '#6366f1' },
        { name: 'Intl Stocks', value: 15000, color: '#8b5cf6' },
        { name: 'Crypto', value: 5000, color: '#10b981' },
        { name: 'Cash', value: 12450, color: '#f59e0b' }
    ],
    passiveIncome: [
        { month: 'Jan', dividends: 120, interest: 45, rental: 0 },
        { month: 'Feb', dividends: 125, interest: 48, rental: 0 },
        { month: 'Mar', dividends: 340, interest: 50, rental: 0 },
    ],
    family: [
        { id: 1, name: "Sarah (Partner)", status: "Synced 2m ago", icon: "👩‍💼" },
        { id: 2, name: "Leo (Kid)", status: "Allowance: $20/wk", icon: "👦" }
    ],
    upcomingBills: [
        { id: 1, name: "Geico Auto", amount: 112.50, date: "Tomorrow", icon: "🚗", status: "pending" },
        { id: 2, name: "Electric Bill", amount: 85.00, date: "In 3 days", icon: "⚡", status: "pending" },
        { id: 3, name: "Rent", amount: 1850.00, date: "May 1st", icon: "🏠", status: "pending" }
    ],
    sharedExpenses: [
        { id: 1, person: "Mike T.", amount: 45.00, type: "owes_me", note: "Dinner at Luigi's", icon: "🧔" },
        { id: 2, person: "Sarah", amount: 120.00, type: "i_owe", note: "Groceries", icon: "👩‍💼" }
    ],
    creditScore: {
        score: 782,
        change: 14,
        status: "Excellent",
        factors: [
            { name: "Payment History", value: "100%", impact: "High", color: "text-emerald-400" },
            { name: "Credit Usage", value: "8%", impact: "High", color: "text-emerald-400" },
            { name: "Credit Age", value: "4.5 yrs", impact: "Medium", color: "text-yellow-400" }
        ]
    }
};
