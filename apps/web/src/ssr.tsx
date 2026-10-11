export function injectRuntimeEnv() {
  const runtimeEnv = {};

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__ENV__ = ${JSON.stringify(runtimeEnv)};`,
      }}
    />
  );
}
