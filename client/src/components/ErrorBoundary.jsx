import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error('[ui]', error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const chunkError = /Failed to fetch dynamically imported module|Loading chunk/i.test(this.state.error?.message || '');
    return (
      <div className="grid min-h-screen place-items-center p-6">
        <div className="panel max-w-md p-8 text-center">
          <h1 className="font-display text-xl font-semibold">Sahifani ko‘rsatib bo‘lmadi</h1>
          <p className="mt-2 text-sm text-muted">{chunkError ? 'Ilovaning yangi versiyasi chiqqan bo‘lishi mumkin. Sahifani yangilang.' : 'Kutilmagan xatolik yuz berdi. Sahifani yangilab ko‘ring.'}</p>
          <button onClick={() => window.location.reload()} className="mt-5 h-10 rounded-control bg-primary px-4 text-sm font-medium text-white hover:bg-primary-ink">Sahifani yangilash</button>
        </div>
      </div>
    );
  }
}
