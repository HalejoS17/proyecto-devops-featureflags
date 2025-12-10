module.exports = {
  process(src) {
    // Reemplaza import.meta.env por un objeto seguro
    const replaced = src.replace(/import\.meta\.env/g, "globalThis.__IMPORT_META_ENV__");
    return { code: replaced };
  }
};
