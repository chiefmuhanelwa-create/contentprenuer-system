import { useState } from 'react';
import { useBusinessStore } from '../store/useBusinessStore';
import { formatCurrency, formatDate } from '../lib/utils';
import { Plus, X, Package } from 'lucide-react';
import type { ProductStatus, ProductType } from '../types';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NewProductModal({ isOpen, onClose }: NewProductModalProps) {
  const { addProduct } = useBusinessStore();
  const [name, setName] = useState('');
  const [type, setType] = useState<ProductType>('course');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState<ProductStatus>('idea');
  const [launchDate, setLaunchDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    addProduct({
      userId: 'default-user',
      name,
      type,
      price: parseFloat(price),
      status,
      launchDate: launchDate ? new Date(launchDate) : undefined,
    });

    setName('');
    setPrice('');
    setLaunchDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Add New Product
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ProductType)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="course">Course</option>
              <option value="book">Book</option>
              <option value="micro-product">Micro-Product</option>
              <option value="membership">Membership</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price (R)
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductStatus)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="idea">Idea</option>
              <option value="planning">Planning</option>
              <option value="production">Production</option>
              <option value="launched">Launched</option>
              <option value="evergreen">Evergreen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Launch Date (optional)
            </label>
            <input
              type="date"
              value={launchDate}
              onChange={(e) => setLaunchDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProductRoadmap() {
  const { products, updateProduct } = useBusinessStore();
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  const statuses: ProductStatus[] = ['idea', 'planning', 'production', 'launched', 'evergreen'];
  const statusLabels: Record<ProductStatus, string> = {
    idea: 'Idea',
    planning: 'Planning',
    production: 'Production',
    launched: 'Launched',
    evergreen: 'Evergreen',
  };

  const statusColors: Record<ProductStatus, string> = {
    idea: 'bg-gray-200 dark:bg-gray-700',
    planning: 'bg-yellow-200 dark:bg-yellow-900/30',
    production: 'bg-blue-200 dark:bg-blue-900/30',
    launched: 'bg-green-200 dark:bg-green-900/30',
    evergreen: 'bg-purple-200 dark:bg-purple-900/30',
  };

  const typeLabels: Record<ProductType, string> = {
    course: 'Course',
    book: 'Book',
    'micro-product': 'Micro-Product',
    membership: 'Membership',
    other: 'Other',
  };

  // Pre-populate with default products if none exist
  const initializeDefaultProducts = () => {
    const { addProduct } = useBusinessStore.getState();
    const defaultProducts = [
      { name: 'Contentpreneur Starter System', type: 'course' as ProductType, price: 997, status: 'idea' as ProductStatus },
      { name: 'Fruitful Creator System', type: 'course' as ProductType, price: 4997, status: 'idea' as ProductStatus },
      { name: 'Empire Builder Mastermind', type: 'course' as ProductType, price: 14997, status: 'idea' as ProductStatus },
      { name: 'The Table Membership', type: 'membership' as ProductType, price: 497, status: 'idea' as ProductStatus },
      { name: 'Niche Clarity Workbook', type: 'micro-product' as ProductType, price: 149, status: 'idea' as ProductStatus },
    ];

    if (products.length === 0) {
      defaultProducts.forEach((product) => {
        addProduct({
          userId: 'default-user',
          ...product,
        });
      });
    }
  };

  // Initialize on first render if needed
  if (products.length === 0) {
    initializeDefaultProducts();
  }

  const moveProduct = (productId: string, newStatus: ProductStatus) => {
    updateProduct(productId, { status: newStatus });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Roadmap
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Build your product empire
          </p>
        </div>

        <button
          onClick={() => setShowNewProductModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statuses.map((status) => {
          const statusProducts = products.filter((p) => p.status === status);

          return (
            <div key={status} className="flex flex-col">
              {/* Column Header */}
              <div className={`${statusColors[status]} p-4 rounded-t-lg border-b-4 border-primary-600`}>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {statusLabels[status]}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {statusProducts.length} {statusProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              {/* Column Content */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-b-lg min-h-[400px] space-y-3 border border-gray-200 dark:border-gray-700">
                {statusProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {product.name}
                      </h4>
                      <Package className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {typeLabels[product.type]}
                      </p>

                      <p className="text-lg font-bold text-primary-600">
                        {formatCurrency(product.price)}
                      </p>

                      {product.launchDate && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Launch: {formatDate(product.launchDate)}
                        </p>
                      )}

                      {product.revenueGenerated > 0 && (
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Revenue: {formatCurrency(product.revenueGenerated)}
                        </p>
                      )}

                      {/* Status Change Buttons */}
                      <div className="flex gap-1 pt-2 border-t border-gray-200 dark:border-gray-700">
                        {status !== 'idea' && (
                          <button
                            onClick={() => {
                              const currentIndex = statuses.indexOf(status);
                              if (currentIndex > 0) {
                                moveProduct(product.id, statuses[currentIndex - 1]);
                              }
                            }}
                            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                          >
                            ←
                          </button>
                        )}
                        {status !== 'evergreen' && (
                          <button
                            onClick={() => {
                              const currentIndex = statuses.indexOf(status);
                              if (currentIndex < statuses.length - 1) {
                                moveProduct(product.id, statuses[currentIndex + 1]);
                              }
                            }}
                            className="text-xs px-2 py-1 bg-primary-600 text-white rounded hover:bg-primary-700"
                          >
                            →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {statusProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-400 dark:text-gray-600">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No products</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Product Modal */}
      <NewProductModal
        isOpen={showNewProductModal}
        onClose={() => setShowNewProductModal(false)}
      />
    </div>
  );
}
