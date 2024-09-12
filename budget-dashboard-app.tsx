import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle, ArrowUpDown } from 'lucide-react';

const BudgetDashboard = () => {
  const [incomes, setIncomes] = useState([
    { id: 1, name: 'Salaire', amount: 1835, date: '2024-09-30' },
    { id: 2, name: 'Aide parentale', amount: 240, date: '2024-09-28' },
    { id: 3, name: 'CAF', amount: 465.74, date: '2024-09-05' }
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Assurance voiture', amount: 67.29, date: '2024-09-04', category: 'Obligatoire' },
    { id: 2, name: 'Loyer', amount: 127.85, date: '2024-09-05', category: 'Obligatoire' },
    { id: 3, name: 'Internet', amount: 24.99, date: '2024-09-05', category: 'Obligatoire' },
    { id: 4, name: 'Électricité', amount: 94.24, date: '2024-09-07', category: 'Obligatoire' },
    { id: 5, name: 'Eau', amount: 128.54, date: '2024-09-10', category: 'Obligatoire' },
    { id: 6, name: 'Alimentation', amount: 173.52, date: '2024-09-15', category: 'Obligatoire' },
    { id: 7, name: 'Transport', amount: 102.38, date: '2024-09-20', category: 'Obligatoire' },
    { id: 8, name: 'Pharmacie', amount: 21.20, date: '2024-09-25', category: 'Obligatoire' },
    { id: 9, name: 'Spotify', amount: 6.06, date: '2024-09-10', category: 'Abonnement' },
    { id: 10, name: 'Canal+', amount: 19.49, date: '2024-09-10', category: 'Abonnement' },
    { id: 11, name: 'Basic-Fit', amount: 43.98, date: '2024-09-30', category: 'Abonnement' },
    { id: 12, name: 'Apple', amount: 2.99, date: '2024-09-15', category: 'Abonnement' },
    { id: 13, name: 'Adobe', amount: 15.60, date: '2024-09-24', category: 'Abonnement' },
    { id: 14, name: 'Amazon Prime', amount: 3.49, date: '2024-09-30', category: 'Abonnement' },
    { id: 15, name: 'Coiffeur', amount: 35.00, date: '2024-09-25', category: 'Facultatif' },
    { id: 16, name: 'Restaurants', amount: 4.27, date: '2024-09-18', category: 'Facultatif' },
    { id: 17, name: 'Bars', amount: 15.00, date: '2024-09-20', category: 'Facultatif' },
    { id: 18, name: 'Sport', amount: 87.24, date: '2024-09-15', category: 'Facultatif' },
    { id: 19, name: 'Cadeaux', amount: 35.00, date: '2024-09-22', category: 'Facultatif' },
    { id: 20, name: 'Shopping', amount: 153.87, date: '2024-09-28', category: 'Facultatif' },
    { id: 21, name: 'Remboursement prêt 1', amount: 7.26, date: '2024-09-10', category: 'Épargne' },
    { id: 22, name: 'Remboursement prêt 2', amount: 256.37, date: '2024-09-05', category: 'Épargne' },
    { id: 23, name: 'Vers LDD', amount: 600, date: '2024-09-30', category: 'Épargne' }
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const cashflow = totalIncome - totalExpenses;

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const addItem = (items, setItems, category = null) => {
    const newItem = { 
      id: Math.max(...items.map(item => item.id), 0) + 1, 
      name: '', 
      amount: 0, 
      date: new Date().toISOString().split('T')[0],
      ...(category && { category })
    };
    setItems([...items, newItem]);
  };

  const updateItem = (items, setItems, id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (items, setItems, id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const ExpenseCard = ({ title, items, setItems, category }) => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-blue-600 text-white font-bold text-lg py-3 px-4 flex justify-between items-center">
        <span>{title}</span>
        <Button onClick={() => addItem(items, setItems, category)} className="p-1 bg-white text-blue-600">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-bold">
            <span className="w-1/4">Nom</span>
            <span className="w-1/4">
              Montant
              <Button onClick={() => handleSort('amount')} className="ml-1 p-1">
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </span>
            <span className="w-1/4">
              Date
              <Button onClick={() => handleSort('date')} className="ml-1 p-1">
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </span>
            <span className="w-1/4">Actions</span>
          </div>
          {items.filter(item => !category || item.category === category).map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Input
                value={item.name}
                onChange={(e) => updateItem(items, setItems, item.id, 'name', e.target.value)}
                className="w-1/4 border rounded px-2 py-1"
              />
              <Input
                type="number"
                value={item.amount}
                onChange={(e) => updateItem(items, setItems, item.id, 'amount', parseFloat(e.target.value) || 0)}
                className="w-1/4 border rounded px-2 py-1"
              />
              <Input
                type="date"
                value={item.date}
                onChange={(e) => updateItem(items, setItems, item.id, 'date', e.target.value)}
                className="w-1/4 border rounded px-2 py-1"
              />
              <Button onClick={() => removeItem(items, setItems, item.id)} className="w-1/4 p-1">
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right font-bold text-lg">
          Total: {items.filter(item => !category || item.category === category).reduce((sum, item) => sum + item.amount, 0).toFixed(2)} €
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Tableau de bord budgétaire 50-30-20</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-green-100 shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-green-600 text-white font-bold text-lg py-3 px-4">Entrées</CardHeader>
          <CardContent className="p-4 text-2xl font-bold text-center">{totalIncome.toFixed(2)} €</CardContent>
        </Card>
        <Card className="bg-red-100 shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-red-600 text-white font-bold text-lg py-3 px-4">Sorties</CardHeader>
          <CardContent className="p-4 text-2xl font-bold text-center">{totalExpenses.toFixed(2)} €</CardContent>
        </Card>
        <Card className={`shadow-lg rounded-lg overflow-hidden ${cashflow >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
          <CardHeader className={`text-white font-bold text-lg py-3 px-4 ${cashflow >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
            Flux de trésorerie
          </CardHeader>
          <CardContent className="p-4 text-2xl font-bold text-center">{cashflow.toFixed(2)} €</CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseCard title="Revenus" items={incomes} setItems={setIncomes} />
        <ExpenseCard title="Dépenses obligatoires" items={expenses} setItems={setExpenses} category="Obligatoire" />
        <ExpenseCard title="Abonnements" items={expenses} setItems={setExpenses} category="Abonnement" />
        <ExpenseCard title="Dépenses facultatives" items={expenses} setItems={setExpenses} category="Facultatif" />
        <ExpenseCard title="Épargne & Investissement" items={expenses} setItems={setExpenses} category="Épargne" />
      </div>
    </div>
  );
};

export default BudgetDashboard;
