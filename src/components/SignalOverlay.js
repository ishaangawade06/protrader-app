// SignalOverlay.js
import React, { useEffect, useState } from "react";

/*
  Usage:
    <SignalOverlay symbol="RELIANCE.NS" chartApi={chartApi} />
  where chartApi is the chart library API you use:
    - For TradingView widget: use TradingView widget's JS methods to add shapes/lines
    - For Lightweight-Charts: use series.createPriceLine() etc.
  This component only fetches signal data and calls chart overlay hooks (you need to implement chartApi integration functions).
*/

export default function SignalOverlay({ symbol, chartApi }) {
  const [signal, setSignal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;
    let mounted = true;
    const fetchSignal = async () => {
      try {
        // Option A: fetch from your backend endpoint
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL || ""}/signal?symbol=${encodeURIComponent(symbol)}&interval=5m`, {
          headers: { "X-APP-KEY": localStorage.getItem("app_key") || "" }
        });
        const j = await res.json();
        if (!mounted) return;
        setSignal(j);
        // draw overlays on chart
        drawOverlaysOnChart(j);
      } catch (e) {
        console.error("fetchSignal", e);
        setError(e.toString());
      }
    };
    fetchSignal();
    // optionally poll every 15s
    const id = setInterval(fetchSignal, 15000);
    return () => { mounted = false; clearInterval(id); };
  }, [symbol, chartApi]);

  function drawOverlaysOnChart(signalPayload) {
    if (!signalPayload || !chartApi) return;
    try {
      const meta = signalPayload.meta || {};
      // Example for Lightweight-Charts (pseudo):
      if (chartApi.type === "lightweight") {
        // draw support/resistance lines
        (meta.supports || []).forEach((lvl, idx) => {
          chartApi.addPriceLine({ price: Number(lvl), color: idx===0 ? "orange" : "gray", label: `S${idx+1}` });
        });
        (meta.resistances || []).forEach((lvl, idx) => {
          chartApi.addPriceLine({ price: Number(lvl), color: idx===0 ? "purple" : "gray", label: `R${idx+1}` });
        });
        // TP/SL lines
        if (meta.take_profit) chartApi.addPriceLine({ price: Number(meta.take_profit), color: "green", label: "TP" });
        if (meta.stop_loss) chartApi.addPriceLine({ price: Number(meta.stop_loss), color: "red", label: "SL" });
        // highlight candle by timestamp (if provided)
        if (meta.timestamp) {
          chartApi.highlightTimestamp(meta.timestamp);
        }
      }
      // Example for TradingView widget (pseudo):
      if (chartApi.type === "tradingview") {
        const widget = chartApi.widget;
        // add horizontal lines using widget API (pseudo-code)
        (meta.supports || []).forEach((lvl, idx) => {
          widget.createShape({ time: widget.activeTime, price: Number(lvl), text: `S${idx+1}` });
        });
        // etc...
      }
    } catch (e) {
      console.error("drawOverlaysOnChart error", e);
    }
  }

  return (
    <div style={{ padding: 8 }}>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {!signal && <div>Loading signal...</div>}
      {signal && (
        <div>
          <div style={{ fontSize: 16, fontWeight: "bold" }}>{signal.signal} • {Math.round((signal.confidence||0) * 100)}%</div>
          <div style={{ color: "#666", marginTop: 6 }}>{(signal.reasons || []).join(" · ")}</div>
          <div style={{ marginTop: 8 }}>
            <div>Entry: {signal.meta?.entry}</div>
            <div>SL: {signal.meta?.stop_loss}</div>
            <div>TP: {signal.meta?.take_profit}</div>
          </div>
        </div>
      )}
    </div>
  );
}
