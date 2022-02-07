import React from "react";
import appConfig from "../../config.json";

export default function CadastroEfetuado() {
  return (
    <section
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        inset: "0",
        backgroundColor: appConfig.theme.colors.primary[900],
        zIndex: 999,
      }}
    >
      <h2>CADASTRO EFETUADO COM SUCESSO</h2>
    </section>
  );
}
