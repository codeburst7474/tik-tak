import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import './App.css';

const API_URL = 'http://localhost:3000/ai/get-review';

function App() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setError('');
    setReview('');

    try {
      const response = await axios.post(API_URL, { code });
      if (response.data.success) {
        setReview(response.data.review);
      } else {
        setError(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to connect to the server. Make sure the backend is running on port 3000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setReview('');
    setError('');
  };

  const handleCopyResult = async () => {
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const handleKeyDown = (e) => {
    // Allow Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setCode(code.substring(0, start) + '  ' + code.substring(end));
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
    // Ctrl+Enter to submit
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAnalyze();
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <div className="logo-icon">⚡</div>
          <h1>CodeLens AI</h1>
        </div>
        <span className="header-badge">Powered by Gemini</span>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Code Editor */}
        <section className="editor-section">
          <div className="editor-header">
            <div className="editor-header-left">
              <div className="editor-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="editor-title">paste your code here</span>
            </div>
            <div className="editor-actions">
              {code && (
                <button className="btn-clear" onClick={handleClear}>
                  ✕ Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            id="code-input"
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`// Paste your code here...\n// Example:\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));`}
            spellCheck="false"
            autoComplete="off"
          />

          <div className="submit-bar">
            <span className="char-count">
              {code.length > 0 ? `${code.length} characters` : 'Ready'}
            </span>
            <button
              id="analyze-btn"
              className="btn-analyze"
              onClick={handleAnalyze}
              disabled={!code.trim() || loading}
            >
              {loading ? (
                <>⏳ Analyzing...</>
              ) : (
                <>🔍 Analyze Code</>
              )}
            </button>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="loading-section">
            <div className="loading-spinner"></div>
            <p className="loading-text">
              CodeLens AI is analyzing your code...
            </p>
          </section>
        )}

        {/* Error State */}
        {error && (
          <div className="error-section">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Result */}
        {review && !loading && (
          <section className="result-section">
            <div className="result-header">
              <div className="result-header-left">
                <div className="result-status"></div>
                <span className="result-title">Analysis Complete</span>
              </div>
              <button className="btn-copy" onClick={handleCopyResult}>
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="result-body">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {review}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!review && !loading && !error && (
          <div className="empty-state">
            <div className="empty-icon">🧠</div>
            <h2 className="empty-title">Paste code to get started</h2>
            <p className="empty-desc">
              CodeLens AI will analyze your code and provide a detailed overview,
              quality score, improvement suggestions, and an optimized version.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          Built with <span>CodeLens AI</span> · Powered by Google Gemini
        </p>
      </footer>
    </div>
  );
}

export default App;
