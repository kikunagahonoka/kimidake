"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const MotivationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    motivation: 0,
    title: '',
    age: '',
    date: '',
    details: '',
    relatedEvents: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'motivation' ? Math.max(-100, Math.min(100, Number(value))) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/motivation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/graph');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="motivation" className="block">モチベーション (-100 ~ 100%)</label>
        <input
          type="number"
          id="motivation"
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          min="-100"
          max="100"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="title" className="block">題名</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="age" className="block">年齢</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="date" className="block">日付</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="details" className="block">出来事の詳細</label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        ></textarea>
      </div>
      <div>
        <label htmlFor="relatedEvents" className="block">関連する出来事</label>
        <input
          type="text"
          id="relatedEvents"
          name="relatedEvents"
          value={formData.relatedEvents}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        送信
      </button>
    </form>
  );
};

export default MotivationForm;