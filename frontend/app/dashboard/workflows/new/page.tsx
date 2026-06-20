'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { WorkflowHeader } from '@/components/workflow/WorkflowHeader';
import { WorkflowToolbar } from '@/components/workflow/WorkflowToolbar';
import { WorkflowNameModal } from '@/components/workflow/WorkflowNameModal';
import { AlertModal } from '@/components/ui/AlertModal';
import {
  createTriggerNode,
  createHttpNode,
  createEmailNode,
  createConditionNode,
} from '@/lib/workflow/nodes';
import { saveWorkflow } from '@/lib/workflow/save';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

const initialNodes = [createTriggerNode()];
const initialEdges: Edge[] = [];

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function WorkflowBuilder() {
  const router = useRouter();
  const { workspaceId, loading: loadingWorkspace } = useWorkspaceId();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [saving, setSaving] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showAlert = (title: string, message: string, type: AlertState['type'] = 'info') => {
    setAlert({ isOpen: true, title, message, type });
  };

  const closeAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addHttpNode = () => setNodes((nds) => [...nds, createHttpNode()]);
  const addEmailNode = () => setNodes((nds) => [...nds, createEmailNode()]);
  const addConditionNode = () => setNodes((nds) => [...nds, createConditionNode()]);

  const handleSaveClick = () => {
    console.log('🔍 Save clicked. Workspace ID:', workspaceId);

    if (!workspaceId) {
      showAlert(
        'Workspace Bulunamadı',
        'Lütfen:\n1. Çıkış yapın\n2. Yeni hesap oluşturun\n3. Tekrar deneyin',
        'error'
      );
      console.error('❌ No workspace ID available');
      return;
    }

    if (nodes.length <= 1) {
      showAlert(
        'Node Eksik',
        'Lütfen en az bir action node ekleyin!\n\nToolbar\'dan HTTP Request, Email veya Condition ekleyebilirsiniz.',
        'warning'
      );
      return;
    }

    setShowNameModal(true);
  };

  const handleSaveWithName = async (workflowName: string) => {
    setShowNameModal(false);
    setSaving(true);

    try {
      console.log('💾 Saving workflow...', { workspaceId, name: workflowName, nodeCount: nodes.length });

      const workflow = await saveWorkflow({
        workspaceId: workspaceId!,
        name: workflowName,
        description: 'Created from builder',
        nodes,
        edges,
      });

      console.log('✅ Workflow saved:', workflow);

      showAlert(
        'Workflow Kaydedildi!',
        `Workflow ID: ${workflow.id}\n\nWebhook URL:\nPOST http://localhost:3001/api/v1/webhooks/webhook/${workflow.id}`,
        'success'
      );

      // Redirect after user closes alert
      setTimeout(() => {
        router.push('/dashboard/workflows');
      }, 2000);
    } catch (error: any) {
      console.error('❌ Save error:', error);
      showAlert(
        'Kaydetme Başarısız',
        `${error.message}\n\nDetaylar console'da (F12)`,
        'error'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleTest = () => {
    console.log('🧪 Test clicked');

    if (nodes.length <= 1) {
      showAlert(
        'Node Eksik',
        'Lütfen en az bir action node ekleyin!',
        'warning'
      );
      return;
    }

    const nodeInfo = nodes.map(n => ({
      id: n.id,
      type: n.type,
      label: n.data?.label,
    }));

    const edgeInfo = edges.map(e => ({
      from: e.source,
      to: e.target,
    }));

    console.log('📊 Workflow Test:', { nodes: nodeInfo, edges: edgeInfo });

    showAlert(
      'Workflow Test',
      `Nodes: ${nodes.length}\nConnections: ${edges.length}\n\nDetaylar console'da (F12)`,
      'info'
    );
  };

  if (loadingWorkspace) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Workspace yükleniyor...</p>
          <p className="text-sm text-gray-400">Console'u kontrol edin (F12)</p>
        </div>
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">❌ Workspace Bulunamadı</h2>
          <p className="text-gray-700 mb-4">
            Workflow oluşturmak için önce bir workspace'e ihtiyacınız var.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Çözüm:</strong>
            </p>
            <ol className="list-decimal list-inside text-sm text-yellow-800 mt-2 space-y-1">
              <li>Çıkış yapın</li>
              <li>Yeni hesap oluşturun</li>
              <li>Workspace otomatik oluşturulacak</li>
            </ol>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              router.push('/auth/register');
            }}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Yeni Hesap Oluştur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <WorkflowHeader onTest={handleTest} onSave={handleSaveClick} />
      <WorkflowToolbar
        onAddHttp={addHttpNode}
        onAddEmail={addEmailNode}
        onAddCondition={addConditionNode}
      />
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>

      <WorkflowNameModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSave={handleSaveWithName}
      />

      <AlertModal
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />

      {saving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-lg font-semibold">💾 Workflow kaydediliyor...</p>
          </div>
        </div>
      )}
    </div>
  );
}
