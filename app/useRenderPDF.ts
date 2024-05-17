import { useEffect } from 'react';
import { useAsync } from 'react-use';

import { renderPDF } from './workers';
import type { WorkerType } from './workers/pdf.worker';


export const useRenderPDF = ({ text }: Parameters<WorkerType['renderPDFInWorker']>[0]) => {
  const {
    value: url,
    loading,
    error,
  } = useAsync(async () => {
    return renderPDF({ text });
  }, [text]);

  useEffect(() => (url ? () => URL.revokeObjectURL(url) : undefined), [url]);
  return { url, loading, error };
};
