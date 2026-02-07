interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
}

const Card: React.FC<CardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColor = changeType === 'increase'
    ? 'text-green-600'
    : changeType === 'decrease'
      ? 'text-red-600'
      : 'text-clarte-gray-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-clarte-gray-500 uppercase tracking-wider">{title}</h3>
          <p className="mt-1 text-3xl font-semibold text-clarte-gray-900">{value}</p>
        </div>
        <div className="bg-clarte-orange-100 text-clarte-orange-600 p-3 rounded-full">
          {icon}
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`${changeColor} font-medium`}>{change}</span>
        </div>
      )}
    </div>
  );
};

export default Card;
