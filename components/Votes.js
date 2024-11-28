import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const Votes = ({ votes }) => {
    const { pour, absent, abstention, contre } = votes;
    
    // Calculate total
    const total = pour + absent + abstention + contre;

    // Prepare data for pie chart
    const data = [
        { name: 'Pour', value: pour, color: '#2ECC71' },      // Green
        { name: 'Contre', value: contre, color: '#E74C3C' },  // Red
        { name: 'Abstention', value: abstention, color: '#F1C40F' }, // Yellow
        { name: 'Absent', value: absent, color: '#95A5A6' },  // Gray
    ];

    return (
      <div className="w-full">
        <h3 className="text-lg font-bold mb-4">Votes aux scrutins de l'Assemblée Nationale</h3>
        
        <div className="mb-4">
          <p className="text-md">
            Nombre total de scrutins : <span className="font-semibold">{total}</span>
          </p>
        </div>

        <div className="w-full flex justify-center">
          <PieChart width={500} height={500}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ value, percent }) => `${value} (${(percent * 100).toFixed(1)}%)`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    );
}

export default Votes;
