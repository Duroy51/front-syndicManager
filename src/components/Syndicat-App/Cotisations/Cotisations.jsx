


export const ContributionsList = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Cotisations</h2>
            <table className="w-full">
                <thead>
                <tr className="bg-blue-100">
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Montant</th>
                    <th className="p-2 text-left">Statut</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="p-2">01/05/2023</td>
                    <td className="p-2">50 €</td>
                    <td className="p-2 text-green-500">Payé</td>
                </tr>
                <tr>
                    <td className="p-2">01/04/2023</td>
                    <td className="p-2">50 €</td>
                    <td className="p-2 text-green-500">Payé</td>
                </tr>
                <tr>
                    <td className="p-2">01/03/2023</td>
                    <td className="p-2">50 €</td>
                    <td className="p-2 text-red-500">En retard</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}