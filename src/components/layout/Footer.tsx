
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Instituto Suavemente. Todos os direitos reservados.</p>
          <p className="mt-1">
            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
