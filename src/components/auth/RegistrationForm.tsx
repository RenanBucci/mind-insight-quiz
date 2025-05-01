
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  sexuality: string;
}

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();
  
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({ mode: 'onBlur' });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const { password, ...userData } = data;
      await register(userData, password);
      navigate('/quiz');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const sexualityOptions = [
    "Heterossexual",
    "Homossexual",
    "Bissexual",
    "Pansexual",
    "Assexual",
    "Outro",
    "Prefiro não informar"
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-text-primary">
        Crie sua conta
      </h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
            Nome Completo
          </label>
          <Input
            id="name"
            {...registerField('name', { 
              required: "Nome é obrigatório", 
              minLength: { value: 2, message: "Nome deve ter pelo menos 2 caracteres" } 
            })}
            placeholder="Seu nome completo"
            className={errors.name ? "border-error" : ""}
          />
          {errors.name && (
            <p className="text-error text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...registerField('email', { 
              required: "Email é obrigatório",
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                message: "Email inválido" 
              } 
            })}
            placeholder="seuemail@exemplo.com"
            className={errors.email ? "border-error" : ""}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
            Senha
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...registerField('password', { 
                required: "Senha é obrigatória",
                minLength: { value: 8, message: "Senha deve ter pelo menos 8 caracteres" } 
              })}
              placeholder="Crie uma senha forte"
              className={errors.password ? "border-error" : ""}
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-error text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="sexuality" className="block text-sm font-medium text-text-primary mb-1">
            Sexualidade
          </label>
          <select
            id="sexuality"
            {...registerField('sexuality', { required: "Selecione uma opção" })}
            className={`w-full p-2 border rounded-md ${errors.sexuality ? "border-error" : "border-input"}`}
          >
            <option value="">Selecione uma opção</option>
            {sexualityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.sexuality ? (
            <p className="text-error text-sm mt-1">{errors.sexuality.message}</p>
          ) : (
            <p className="text-xs text-text-secondary mt-1">
              Esta informação é protegida e usada apenas para fins de pesquisa.
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-error rounded-md">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full"
        disabled={loading || !isValid}
      >
        {loading ? "Criando conta..." : "Criar Conta"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
