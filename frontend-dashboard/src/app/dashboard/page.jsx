"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Navbar from "../components/Navbar";
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [payoutRate, setPayoutRate] = useState(Number(localStorage.getItem("payoutRate")) || 0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2024-12-05&sortBy=publishedAt&apiKey=8587fb43b56040e7b46da2ed52283f57");
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesAuthor = article.author?.toLowerCase().includes(filterAuthor.toLowerCase());
    const matchesDate = filterDate ? article.publishedAt.startsWith(filterDate) : true;
    const matchesSearchTerm = article.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               article.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAuthor && matchesDate && matchesSearchTerm;
  });

  const totalPayout = filteredArticles.length * payoutRate;

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredArticles);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'articles.csv');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const payouts = calculatePayouts();

    autoTable(doc, {
      head: [['Author', 'Articles', 'Payout']],
      body: Object.entries(payouts).map(([author, { count, payout }]) => [author, count, payout.toFixed(2)]),
    });

    doc.save('payouts.pdf');
  };

  const exportToGoogleSheets = () => {
    const payouts = calculatePayouts();
    const sheetData = [
      ["Author", "Articles", "Payout"],
      ...Object.entries(payouts).map(([author, { count, payout }]) => [author, count, payout.toFixed(2)]),
    ];

    const googleSheetsUrl = `https://docs.google.com/spreadsheets/u/0/?tgif=d#gid=0&range=A1:C1&values=${encodeURIComponent(JSON.stringify(sheetData))}`;
    window.open(googleSheetsUrl, "_blank");
  };

  const calculatePayouts = () => {
    const payouts = {};

    filteredArticles.forEach(article => {
      const authors = article.author ? article.author.split(",") : ["Unknown Author"];
      authors.forEach(author => {
        const trimmedAuthor = author.trim();
        if (!payouts[trimmedAuthor]) {
          payouts[trimmedAuthor] = { count: 0, payout: 0 };
        }
        payouts[trimmedAuthor].count += 1;
        payouts[trimmedAuthor].payout += payoutRate;
      });
    });

    return payouts;
  };

  const authorPayouts = calculatePayouts();

  const chartData = {
    labels: Object.keys(authorPayouts),
    datasets: [
      {
        label: "Articles Count",
        data: Object.values(authorPayouts).map(author => author.count),
        backgroundColor: "#4A90E2",
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar activePage="dashboard" onNavigate={() => {}} />

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Global Search Bar */}
        <div className="bg-white shadow p-4 rounded col-span-1 md:col-span-3">
          <h2 className="text-gray-800 font-bold">Global Search</h2>
          <input
            type="text"
            placeholder="Search by keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Filters and Export Section */}
        <div className="bg-white shadow p-4 rounded col-span-1 md:col-span-1">
          <h2 className="text-gray-800 font-bold">Filter Articles</h2>
          <input
            type="text"
            placeholder="Filter by Author..."
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <h2 className="text-gray-800 font-bold mt-4">Export Options</h2>
          <button onClick={exportToCSV} className="bg-blue-600 text-white p-2 rounded w-full mt-2">
            Export to CSV
          </button>
          <button onClick={exportToPDF} className="bg-green-600 text-white p-2 rounded w-full mt-2">
            Export to PDF
          </button>
          <button onClick={exportToGoogleSheets} className="bg-yellow-600 text-white p-2 rounded w-full mt-2">
            Export to Google Sheets
          </button>
        </div>

        {/* Chart Section */}
        <div className="p-4 bg-white shadow rounded col-span-1 md:col-span-2">
          <h2 className="text-gray-800 font-bold mb-4">Articles Count by Author</h2>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                },
              },
            }}
          />
        </div>

        {/* Payouts for Each Author */}
        <div className="p-4 bg-white shadow rounded col-span-1 md:col-span-3">
          <h2 className="text-gray-800 font-bold mb-4">Payouts by Author</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300 text-black">Author</th>
                <th className="p-2 border border-gray-300 text-black">Articles</th>
                <th className="p-2 border border-gray-300 text-black">Payout</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(authorPayouts).map(([author, { count, payout }]) => (
                (searchTerm === "" || author.toLowerCase().includes(searchTerm.toLowerCase())) && (
                  <tr key={author}>
                    <td className="p-2 border border-gray-300 text-black">{author}</td>
                    <td className="p-2 border border-gray-300 text-black">{count}</td>
                    <td className="p-2 border border-gray-300 text-black">${payout.toFixed(2)}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
