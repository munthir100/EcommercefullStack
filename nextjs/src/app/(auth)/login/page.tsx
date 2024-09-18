'use client'
import { Card, CardHeader, CardBody, Button, Link} from '@nextui-org/react';
import Form from './form';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full p-6 shadow-lg">
        <CardHeader className="text-center">
          <h4 color="primary" className="mb-4">
            Admin Login
          </h4>
        </CardHeader>
        <CardBody>
          <Form /> {/* Assuming you have a Form component */}
          <div className="mt-4 text-center">
            <Link href="/register">
              <Button variant="light" color="primary">
                Don't have an account? Register here
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
