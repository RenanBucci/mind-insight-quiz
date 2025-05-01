
import Layout from '@/components/layout/Layout';
import RegistrationForm from '@/components/auth/RegistrationForm';
import { Card } from '@/components/ui/card';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          <Card className="p-6 shadow-md">
            <RegistrationForm />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
