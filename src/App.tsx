import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function App() {
  const [netInput, setNetInput] = useState<string>('');
  const [result, setResult] = useState<{ gross: number; tax: number } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 画面のどこを触っても入力欄にフォーカスを当てる（ボタンクリック時を除く）
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'BUTTON' && !target.closest('button')) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // ページ読み込み時の初期フォーカス
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 逆算計算ロジック
  const performCalculation = (valueStr: string) => {
    const net = parseInt(valueStr, 10);
    if (isNaN(net) || net <= 0) {
      setResult(null);
      return;
    }

    // 逆算ロジック (所得税15% + 復興特別所得税0.315% = 15.315%)
    let gross = Math.floor(net / 0.84685);

    function getTax(g: number) {
      const tax1 = Math.floor(g * 0.15);
      const tax2 = Math.floor(g * 0.00315);
      return tax1 + tax2;
    }

    let currentTax = getTax(gross);
    let currentNet = gross - currentTax;

    let safety = 0;
    while (currentNet < net && safety < 10) {
      gross++;
      currentTax = getTax(gross);
      currentNet = gross - currentTax;
      safety++;
    }
    safety = 0;
    while (currentNet > net && safety < 10) {
      gross--;
      currentTax = getTax(gross);
      currentNet = gross - currentTax;
      safety++;
    }

    setResult({
      gross,
      tax: currentTax,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setNetInput(val);
    performCalculation(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performCalculation(netInput);
  };

  const copyValue = (val: number, key: string) => {
    navigator.clipboard.writeText(val.toString());
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex justify-center items-start p-5 font-sans antialiased select-none sm:py-12">
      <div className="bg-white p-7 sm:p-8 rounded-2xl shadow-lg w-full max-w-[400px] border border-slate-100 transition-all">
        <h1 className="text-xl font-bold text-[#2c3e50] text-center mb-6 tracking-wide">
          利息・源泉税 逆算
        </h1>

        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-5">
            <label htmlFor="netAmount" className="block mb-2 font-bold text-sm text-[#555]">
              通帳の入金額 (円)
            </label>
            <input
              ref={inputRef}
              id="netAmount"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={netInput}
              onChange={handleInputChange}
              placeholder="タップして入力"
              className="w-full p-4 border-2 border-slate-200 rounded-xl text-2xl font-bold text-slate-800 outline-none transition-colors focus:border-[#3498db] box-border"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#3498db] hover:bg-[#2980b9] active:scale-[0.99] text-white rounded-xl text-base font-bold cursor-pointer transition-all shadow-md shadow-[#3498db]/20"
          >
            計算実行
          </button>
        </form>

        {result && (
          <div className="mt-6 pt-5 border-t-2 border-dashed border-slate-100 transition-all">
            <div className="flex justify-between items-center mb-3 text-lg">
              <span className="text-[#666] text-sm sm:text-base">利息総額（額面）:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#2c3e50] text-xl">
                  {result.gross.toLocaleString()} 円
                </span>
                <button
                  type="button"
                  onClick={() => copyValue(result.gross, 'gross')}
                  title="額面をコピー"
                  className="p-1.5 text-slate-400 hover:text-[#3498db] transition-colors rounded"
                >
                  {copiedKey === 'gross' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 text-lg">
              <span className="text-[#666] text-sm sm:text-base">源泉徴収税額計:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#e74c3c] text-xl">
                  {result.tax.toLocaleString()} 円
                </span>
                <button
                  type="button"
                  onClick={() => copyValue(result.tax, 'tax')}
                  title="税額をコピー"
                  className="p-1.5 text-slate-400 hover:text-[#e74c3c] transition-colors rounded"
                >
                  {copiedKey === 'tax' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-xs text-[#999] mt-3 text-right">
              ※所得税15%・復興税0.315%の合算
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
