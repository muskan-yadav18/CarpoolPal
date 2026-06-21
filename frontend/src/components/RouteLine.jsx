function RouteLine({ from, to }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.point}>
        <span style={styles.dotStart} />
        {from && <span style={styles.pointLabel}>{from}</span>}
      </div>
      <div style={styles.line} />
      <div style={styles.point}>
        {to && <span style={styles.pointLabel}>{to}</span>}
        <span style={styles.dotEnd} />
      </div>
    </div>
  );
}

const styles = {
  wrap: { display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0 18px' },
  point: { display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 },
  pointLabel: { fontSize: 12, color: '#5C6B66', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' },
  dotStart: { width: 9, height: 9, borderRadius: '50%', backgroundColor: '#1F6F54', display: 'inline-block', flexShrink: 0 },
  line: { flex: 1, height: 0, borderTop: '2px dashed #D7DECF', minWidth: 24 },
  dotEnd: { width: 9, height: 9, borderRadius: '50%', backgroundColor: '#F2A93B', display: 'inline-block', flexShrink: 0 }
};

export default RouteLine;