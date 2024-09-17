import MotivationForm from '@/components/MotivationForm';


export default function FormPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">モチベーション記録</h1>
      <MotivationForm />
    </div>
  );
}