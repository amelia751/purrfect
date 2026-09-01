'use client';

import { useEffect, useState } from 'react';
import { fetchCats } from '@/lib/content';
import { getCatFeaturesTool, getCatProfileTool, searchCatsTool } from '@/lib/catCatalog';

async function register(modelContext, tool, signal) {
  try {
    await modelContext.registerTool(tool, { signal });
  } catch (error) {
    if (error?.name !== 'InvalidStateError' && error?.name !== 'AbortError') {
      console.warn('WebMCP register failed', tool.name, error);
    }
  }
}

export default function CatTools() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchCats().then((next) => {
      if (!cancelled) setCats(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || !cats.length) return undefined;
    const modelContext = document.modelContext ?? navigator.modelContext;
    if (!modelContext?.registerTool) return undefined;

    const controller = new AbortController();
    const { signal } = controller;

    register(modelContext, {
      name: 'search_cats',
      description: 'Search Purrfect Coffee cats by name, breed, or marks.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Name, breed, color, or mark' },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async ({ query } = {}) => JSON.stringify(searchCatsTool(cats, query)),
    }, signal);

    register(modelContext, {
      name: 'get_cat_profile',
      description: 'Get one Purrfect Coffee cat by name or id.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Cat name or id, for example Mon or xiu' },
        },
        required: ['name'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async ({ name } = {}) => JSON.stringify(getCatProfileTool(cats, name) || { error: 'Cat not found' }),
    }, signal);

    register(modelContext, {
      name: 'get_cat_distinguishing_features',
      description: 'Get visual identification notes for one Purrfect Coffee cat.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Cat name or id' },
        },
        required: ['name'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async ({ name } = {}) => JSON.stringify(getCatFeaturesTool(cats, name) || { error: 'Cat not found' }),
    }, signal);

    return () => controller.abort();
  }, [cats]);

  return null;
}
