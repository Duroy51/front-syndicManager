import {Calendar, DollarSign, Edit2, FileText, Filter, Paperclip, PieChart, Plus, Trash2, Users} from "lucide-react";
import {motion} from "framer-motion";
import React, {useState} from "react";


export const Depenses = () => {


    const [showExpenseForm, setShowExpenseForm] = useState(false)
    const [filterCategory, setFilterCategory] = useState('')
    const [filterDate, setFilterDate] = useState('')


    const expenseCategories = [
        { id: 'maintenance', label: 'Entretien' },
        { id: 'repairs', label: 'Réparations' },
        { id: 'purchases', label: 'Achats divers' },
        { id: 'salaries', label: 'Rémunérations' },
    ]

    const expenses = [
        { id: 1, date: '2023-05-15', category: 'maintenance', beneficiary: 'Entreprise de nettoyage', amount: 500 },
        { id: 2, date: '2023-05-20', category: 'repairs', beneficiary: 'Plombier local', amount: 350 },
        { id: 3, date: '2023-05-25', category: 'purchases', beneficiary: 'Fournitures de bureau', amount: 200 },
        { id: 4, date: '2023-05-31', category: 'salaries', beneficiary: 'Personnel administratif', amount: 2000 },
    ]

    const ExpenseForm = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Ajouter une dépense</h3>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="amount">
                            Montant
                        </label>
                        <input
                            type="number"
                            id="amount"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                            Catégorie
                        </label>
                        <select
                            id="category"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {expenseCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="beneficiary">
                            Bénéficiaire
                        </label>
                        <input
                            type="text"
                            id="beneficiary"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nom du bénéficiaire"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="receipt">
                            Justificatif
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>Télécharger un fichier</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">ou glisser-déposer</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, PDF jusqu'à 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setShowExpenseForm(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )



    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div className="flex space-x-4">
                    <div className="relative">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Toutes les catégories</option>
                            {expenseCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.label}</option>
                            ))}
                        </select>
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="month"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowExpenseForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Ajouter une dépense
                </motion.button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bénéficiaire</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{expense.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {expenseCategories.find(cat => cat.id === expense.category)?.label}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{expense.beneficiary}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{expense.amount} €</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-4">
                                    <Edit2 className="h-5 w-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}